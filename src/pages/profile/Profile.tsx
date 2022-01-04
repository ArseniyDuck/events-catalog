import React, { useEffect, useState } from 'react';
import { getHighlightedText, imageUrl, phoneNumber, timeToString } from 'tools/functions';
import s from './Profile.module.scss';
import { Container, Dropdown } from 'components/common';
import { Cross, Dots, Search } from 'icons';
import { useAppDispatch, useAppSelector, useDebounce, useQueryParams } from 'hooks';
import { logout } from 'redux/auth-reducer';
import { history, RouteLinks } from 'app-routing';
import { useGetUserEventsQuery } from 'redux/eventsApi';
import { useFormik } from 'formik';


type PropsType = {};

const Profile: React.FC<PropsType> = (props) => {
   const user = useAppSelector(state => state.auth.user)
   const dispatch = useAppDispatch()

   const {getParam} = useQueryParams<SearchUserEvents>()
   const [searchEventTerm, setSearchEventTerm] = useState(getParam('search'));
   const debouncedSearchTerm = useDebounce(searchEventTerm, 300)

   const { data: events=[], isLoading: isLoadingEvents } = useGetUserEventsQuery(debouncedSearchTerm)

   const handleLogoutClick = () => {
      dispatch(logout())
      history.push(RouteLinks.SIGN_IN)
   }
   
   return (
      <Container className={s.container}>
         <div className={s.banner}>
            <div className={`${s.avatar} ibg`}>
               {user.photo && <img src={imageUrl(user.photo)} alt='avatar' />}
            </div>
            <div className={s.profileData}>
               <h1 className={s.fullname}>{user.fullname}</h1>
               <div className={s.userdata}>
                  <span>{phoneNumber(user.phone_number)}</span>
               </div>
            </div>
         </div>
         <div className={s.options}>
            <SearchEvent setSearchEventTerm={setSearchEventTerm} />
            <button className={s.create}>
               Create event
            </button>
            <Dropdown
               showOn='click'
               initialPosition='top'
               dropdownStyles={{
                  background: '#fff',
                  transform: 'translate(calc(100% - 25px), 5px)'
               }}
               label={
                  <Dots size={25} color='#000' />
               }
            >
               <button className={s.option}>Edit profile</button>
               <button onClick={handleLogoutClick} className={s.option}>Logout</button>
            </Dropdown>
         </div>
         <div className={s.content}>
            <div className={s.tableHeading}>
               <span className={s.tableTitle}>Title</span>
               <span className={s.tableDate}>Date</span>
            </div>
            <div className={s.events}>
               {isLoadingEvents
                  ? 'Loading events...'
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


type FormValues = {
   term: string
}

type SearchUserEvents = {
   search: string
}

type SearchEventProps = {
   setSearchEventTerm: React.Dispatch<React.SetStateAction<string>>
}

const SearchEvent: React.FC<SearchEventProps> = (props) => {
   const { getParam, updateParams } = useQueryParams<SearchUserEvents>()

   const formik = useFormik<FormValues>({
      initialValues: {
         term: getParam('search')
      },
      onSubmit: (formData, { setSubmitting }) => {
         setSubmitting(false)
      }
   })

   const handleReset = () => {
      formik.setFieldValue('term', '')
      props.setSearchEventTerm('')
      updateParams({search: ''})
   }

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value

      formik.setFieldValue('term', value)
      props.setSearchEventTerm(value)
      updateParams({search: value})
   }

   return (
      <form className={s.searchForm} onSubmit={formik.handleSubmit}>
         <button type='submit' disabled={formik.isSubmitting}>
            <Search size={20} color='var(--grey)' />
         </button>
         <input
            autoComplete='off'
            type='text'
            name='term'
            placeholder='Search by title'
            value={formik.values.term}
            onChange={handleChange}
            className={s.searchInput}
         />
         {formik.values.term && (
            <button onClick={handleReset} type='reset'>
               <Cross size={13} isHover />
            </button>
         )}
      </form>
   );
}

type RowEventProps = MyEvent & {
   searchTerm: string
}
const RowEvent: React.FC<RowEventProps> = (props) => {
   return (
      <div className={s.eventRow}>
         <p className={s.eventName}>
            {getHighlightedText(props.name, props.searchTerm, {
               background: 'var(--main-color)',
               color: '#fff'
            })}
         </p>
         <time dateTime={props.time} className={s.eventTime}>{timeToString(props.time)}</time>
      </div>
   );
}

export default Profile;