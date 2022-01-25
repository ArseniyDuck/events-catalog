import React, { useState } from 'react';
import { componentList, phoneNumber } from 'tools/functions';
import s from './Profile.module.scss';
import { Container, Dropdown } from 'components/common';
import { Dots, Spinner } from 'icons';
import { useAppDispatch, useAppSelector, useDebounce, useQueryParams, useModal } from 'hooks';
import { logout } from 'redux/auth-reducer';
import { RouteLinks } from 'app-routing';
import { useCreateEventMutation, useGetUserEventsQuery } from 'redux/eventsApi';
import { useNavigate } from 'react-router';
import ProfileNotification from 'components/profile-notification/ProfileNotification'
import ProfileSearch from 'components/profile-search/ProfileSearch';
import Banner from 'components/banner/Banner';
import EditProfile from 'components/edit-profile/EditProfile';
import EventForm from 'components/event-form/EventForm';
import RowEvent, { RowEventSkeleton } from 'components/row-event/RowEvent';


// todo: check and fix all animations

type PropsType = {};

const Profile: React.FC<PropsType> = (props) => {
   const [
      isCreationOpened,
      setIsCreationOpened,
      creationRef
   ] = useModal<HTMLDivElement>();

   const [
      isEditOpened,
      setIsEditOpened,
      editRef
   ] = useModal<HTMLDivElement>();

   const navigate = useNavigate()
   
   const dispatch = useAppDispatch()
   const user = useAppSelector(state => state.auth.user)

   const { getParam } = useQueryParams<ProfileQueryParams>()
   const [searchEventTerm, setSearchEventTerm] = useState(getParam('search'));
   const debouncedSearchTerm = useDebounce(searchEventTerm, 300)

   const {
      data: events=[],
      isLoading: isLoadingEvents
   } = useGetUserEventsQuery(debouncedSearchTerm);

   const [
      createEvent,
      { isLoading: isLoadingCreation }
   ] = useCreateEventMutation();

   const isLoadingAuth = useAppSelector(state => state.auth.isFetching);

   const isSpinner = isLoadingAuth || isLoadingCreation

   const handleLogout = () => {
      dispatch(logout())
      navigate(RouteLinks.SIGN_IN)
   }

   return (
      <Container className={s.container}>
         {/* todo: don't use condition like this */}
         {user.fullname && (
            <EditProfile
               isOpened={isEditOpened}
               close={() => setIsEditOpened(false)}
               innerRef={editRef}
            />
         )}
         <EventForm
            mode='create'
            isOpened={isCreationOpened}
            close={() => setIsCreationOpened(false)}
            innerRef={creationRef}
            onSubmit={createEvent}
         />
         <Banner
            photo={user.photo}
            title={user.fullname}
            subtitle={phoneNumber(user.phone_number)}
         />
         {/* todo: don't forget about Notification while creating adaptive layout */}
         {user.is_profile_notification_shown && (
            <ProfileNotification />
         )}
         <div className={s.options}>
            <ProfileSearch setSearch={setSearchEventTerm} />
            <button onClick={() => setIsCreationOpened(true)} className={s.create}>
               Create event
            </button>
            <ProfileDropdown>
               <ProfileAction
                  text='Edit profile'
                  onClick={() => setIsEditOpened(true)}
               />
               <ProfileAction
                  text='Logout'
                  onClick={handleLogout}
               />
            </ProfileDropdown>
            {isSpinner && <Spinner size={20} />}
         </div>
         <div className={s.content}>
            <TableHeading />
            <div className={s.events}>
               {isLoadingEvents
                  ? componentList(RowEventSkeleton, 10)
                  : events.map(event => (
                     <RowEvent
                        key={event.id}
                        searchTerm={debouncedSearchTerm}
                        {...event}
                     />
                  ))
               }
            </div>
         </div>
      </Container>
   );
};



const ProfileDropdown: React.FC = (props) => {
   return (
      <Dropdown
         showOn='click'
         initialPosition='top'
         closeOnBody
         dropdownStyles={{
            background: '#fff',
            transform: 'translate(calc(100% - 25px), 5px)',
         }}
         label={
            <Dots size={25} color='#000' />
         }
      >
         {props.children}
      </Dropdown>
   );
}



type ProfileActionProps = {
   text: string
   onClick: () => void
}
const ProfileAction: React.FC<ProfileActionProps> = (props) => {
   return (
      <button
         onClick={props.onClick}
         className={`${s.option} greyOnInteract`}
      >
         {props.text}
      </button>
   );
}



const TableHeading: React.FC = () => {
   return (
      <div className={s.tableHeading}>
         <span className={s.tableTitle}>Title</span>
         <span className={s.tableDate}>Date</span>
         <span className={s.tableIsActive}>Is active</span> 
      </div>
   );
}

export default Profile;