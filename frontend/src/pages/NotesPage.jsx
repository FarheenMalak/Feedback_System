import React from 'react'
import notesStore from '../stores/feedbackStore'
import Notes from '../components/Notes'
import UpdateForm from '../components/UpdateForm'
import CreateForm from '../components/CreateForm'
import { useEffect } from 'react'

const NotesPage = () => {
 const store = notesStore()
  //use effect
  useEffect(() => {
    store.fetchFeedbacks()
  }, [])

  return (
    <div>
      <Notes />
      <UpdateForm />
      <CreateForm />
    </div>
  )
}

export default NotesPage;