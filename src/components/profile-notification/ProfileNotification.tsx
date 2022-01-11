import React from 'react';
import { useAppDispatch, useModal } from 'hooks';
import { deleteNotification } from 'redux/auth-reducer';
import s from './ProfileNotification.module.scss';
import ModalBody from 'components/modal-body/ModalBody';


const ProfileNotification = () => {
   const [isOpened, setIsOpened, ref] = useModal<HTMLDivElement>()

   const dispatch = useAppDispatch();

   const handleNeverShowClick = () => {
      dispatch(deleteNotification())
   }

   const handleClose = () => {
      setIsOpened(false)
   }
   
   return (
      <div className={s.notification}>
         <span onClick={() => setIsOpened(true)} className={s.information}>i</span>
         <p className={s.description}>
            On this page you can manage events that you created
         </p>

         <ModalBody
            title='Never show notification again?'
            width={450}
            isOpened={isOpened}
            close={handleClose}
            innerRef={ref}
         >
            <div className={s.modalButtons}>
               <button
                  onClick={() => setIsOpened(false)}
                  className={s.closeNotificationModal}
               >
                  Close
               </button>
               <button
                  onClick={handleNeverShowClick}
                  className={s.neverShow}
               >
                  Never show
               </button>
            </div>
         </ModalBody>
      </div>
   )
}

export default ProfileNotification;