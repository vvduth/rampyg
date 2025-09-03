import SharedNotificationSettings from '@/components/SharedNotificationSettings'
import React from 'react'

const UserSettingsPage = () => {
  return (
    <div className='w-3/5'>
        <SharedNotificationSettings
            title="Notification Settings"
            subtitle="Manage your notification preferences"
        />
    </div>
  )
}

export default UserSettingsPage