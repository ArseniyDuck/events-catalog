import React, { useState } from 'react';
import { componentList, getHighlightedText, phoneNumber, timeToString } from 'tools/functions';
import s from './Profile.module.scss';
import { Container, Dropdown, TransitionSkeleton } from 'components/common';
import { Cross, Dots, Spinner } from 'icons';
import { useAppDispatch, useAppSelector, useDebounce, useQueryParams, useModal } from 'hooks';
import { logout } from 'redux/auth-reducer';
import { RouteLinks } from 'app-routing';
import { useGetCategoriesQuery, useGetUserEventsQuery } from 'redux/eventsApi';
import { useNavigate } from 'react-router';
import ProfileNotification from 'components/profile-notification/ProfileNotification'
import ProfileSearch from 'components/profile-search/ProfileSearch';
import Banner from 'components/banner/Banner';
import EditProfile from 'components/edit-profile/EditProfile';
import EventCreation from 'components/event-creation/EventCreation';
import SuccessMark from 'icons/succuss-mark/SuccessMark';


// todo: check and fix all animations

type PropsType = {};

const Profile: React.FC<PropsType> = (props) => {
   const [isCreationOpened, setIsCreationOpened, creationRef] = useModal<HTMLDivElement>()
   const [isEditOpened, setIsEditOpened, editRef] = useModal<HTMLDivElement>()

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

   const {data: categories=[], isLoading: isLoadingCategories} = useGetCategoriesQuery();

   const handleLogout = () => {
      dispatch(logout())
      navigate(RouteLinks.SIGN_IN)
   }

   const handleCretionOpen = () => {
      setIsCreationOpened(true)
   }

   const handleCretionClose = () => {
      setIsCreationOpened(false)
   }

   const handleEditOpen = () => {
      setIsEditOpened(true)
   }

   const handleEditClose = () => {
      setIsEditOpened(false)
   }

   const isLoading = useAppSelector(state => state.auth.isFetching)

   return (
      <Container className={s.container}>
         {/* todo: don't use condition like this */}
         {user.fullname && (
            <EditProfile
               isOpened={isEditOpened}
               close={handleEditClose}
               innerRef={editRef}
            />
         )}
         <EventCreation
            isOpened={isCreationOpened}
            close={handleCretionClose}
            innerRef={creationRef}
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
            <button onClick={handleCretionOpen} className={s.create}>
               Create event
            </button>
            <ProfileDropdown>
               <ProfileAction
                  text='Edit profile'
                  onClick={handleEditOpen}
               />
               <ProfileAction
                  text='Logout'
                  onClick={handleLogout}
               />
            </ProfileDropdown>
            {isLoading && (
               <Spinner size={20} />
            )}
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



const TableHeading: React.FC = () => {
   return (
      <div className={s.tableHeading}>
         <span className={s.tableTitle}>Title</span>
         <span className={s.tableDate}>Date</span>
         <span className={s.tableIsActive}>Is active</span> 
      </div>
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



type RowEventProps = MyEvent & {
   searchTerm: string
}
const RowEvent: React.FC<RowEventProps> = (props) => {
   return (
      <div className={`${s.eventRow} greyOnInteract`}>
         <p className={s.eventName}>
            {getHighlightedText(props.name, props.searchTerm, {
               background: 'var(--main-color)',
               color: '#fff'
            })}
         </p>
         <time dateTime={props.time} className={s.eventTime}>{timeToString(props.time)}</time>
         <span className={s.isActive}>
            {props.is_active
               ? 
                  <span className={s.true}>
                     <SuccessMark size={13} color='#fff' />
                  </span>
   
               : (
                  <span className={s.false}>
                     <Cross color='#fff' size={10} stroke={5} />
                  </span>
               )
            }
         </span>
      </div>
   );
}


const RowEventSkeleton: React.FC = (props) => {
   return (
      <div className={s.eventRow}>
         <div className={s.eventName}>
            <TransitionSkeleton width={250} height={20} />   
         </div>
         <div className={s.eventTime}>
            <TransitionSkeleton width={150} height={16} />
         </div>
         <div className={s.isActive}>
            <TransitionSkeleton
               width={20}
               height={20}
               styles={{
                  borderRadius: '50%'
               }}
            />
         </div>
      </div>
   );
}

export default Profile;