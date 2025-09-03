import SharedNotificationSettings from '@/components/SharedNotificationSettings'
import React from 'react'

const TeacherSettingsPage = () => {
  return (
    <div className='w-3/5'>
        <SharedNotificationSettings
            title="Teacher Settings"
            subtitle="Manage your teacher notification preferences"
        />
    </div>
  )
}

export default TeacherSettingsPage