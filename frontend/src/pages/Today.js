import { useEffect, useState } from 'react'
import { useSaveEntryMutation, useTodayEntryQuery } from '../api'
import Mood from '../components/Mood'
import { getFieldError, getFormError } from '../lib/appError'

const moods = ['great', 'good', 'okay', 'rough', 'bad']

export default function Today() {
  const today = new Date().toISOString().slice(0, 10)
  const entryQuery = useTodayEntryQuery(today)
  const saveMutation = useSaveEntryMutation()

  const [content, setContent] = useState('')
  const [mood, setMood] = useState('okay')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!entryQuery.data) {
      return
    }

    setContent(entryQuery.data.content || '')
    setMood(entryQuery.data.mood || 'okay')
  }, [entryQuery.data])

  const save = async () => {
    setSuccess(false)
    try {
      await saveMutation.mutateAsync({ date: today, content, mood })
      setSuccess(true)
    } catch {
      // Error UI is handled by centralized app error patterns.
    }
  }

  const contentFieldError = getFieldError(saveMutation.error, 'content')
  const moodFieldError = getFieldError(saveMutation.error, 'mood')
  const formError = getFormError(saveMutation.error)

  return (
    <div className="today-page">
      <h2>Today's Entry</h2>
      {entryQuery.isPending && <div>Loading today's entry...</div>}
      {formError && <div className="status-message status-message-error">{formError}</div>}
      {success && <div className="status-message status-message-success">Saved!</div>}
      <textarea
        className="today-textarea"
        maxLength={280}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      {contentFieldError && <div className="field-error">{contentFieldError}</div>}

      <div className="today-mood-list">
        {moods.map((m) => (
          <button
            key={m}
            type="button"
            className={`mood-button mood-button-${m} ${mood === m ? 'selected' : ''}`.trim()}
            onClick={() => setMood(m)}
          >
            <Mood mood={m} />
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>
      {moodFieldError && <div className="field-error">{moodFieldError}</div>}

      <button className="save-button" onClick={save} disabled={saveMutation.isPending}>
        {saveMutation.isPending ? 'Saving...' : 'Save'}
      </button>
    </div>
  )
}
