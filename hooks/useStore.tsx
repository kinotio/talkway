import { useState, useEffect } from 'react'

import { supabase, fetchChannels, fetchMessages, fetchUser } from '@lib/supabase'

const useStore = (props: any) => {
  const [channels, setChannels] = useState([])
  const [messages, setMessages] = useState([])
  const [users] = useState(new Map())
  const [newMessage, handleNewMessage] = useState(null) as any
  const [newChannel, handleNewChannel] = useState(null) as any
  const [newOrUpdatedUser, handleNewOrUpdatedUser] = useState(null) as any
  const [deletedChannel, handleDeletedChannel] = useState(null) as any
  const [deletedMessage, handleDeletedMessage] = useState(null) as any

  // Load initial data and set up listeners
  useEffect(() => {
    // Get Channels
    fetchChannels(setChannels)

    // Listen for new and deleted messages
    const messageListener = supabase
      .channel('public:messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload: any) => handleNewMessage(payload.new)
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'messages' },
        (payload: any) => handleDeletedMessage(payload.old)
      )
      .subscribe() as any

    // Listen for changes to our users
    const userListener = supabase
      .channel('public:users')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'users' }, (payload: any) =>
        handleNewOrUpdatedUser(payload.new)
      )
      .subscribe() as any

    // Listen for new and deleted channels
    const channelListener = supabase
      .channel('public:channels')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'channels' },
        (payload: any) => handleNewChannel(payload.new)
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'channels' },
        (payload: any) => handleDeletedChannel(payload.old)
      )
      .subscribe() as any

    // Cleanup on unmount
    return () => {
      supabase.removeChannel(supabase.channel(messageListener))
      supabase.removeChannel(supabase.channel(userListener))
      supabase.removeChannel(supabase.channel(channelListener))
    }
  }, [])

  // Update when the route changes
  useEffect(() => {
    if (props?.channelId > 0) {
      fetchMessages(props.channelId, (messages: any) => {
        messages.forEach((x: any) => users.set(x.user_id, x.author))
        setMessages(messages)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.channelId])

  // New message received from Postgres
  useEffect(() => {
    if (newMessage && newMessage.channel_id === Number(props.channelId)) {
      const handleAsync = async () => {
        let authorId = newMessage.user_id
        if (!users.get(authorId))
          await fetchUser(authorId, (user: any) => handleNewOrUpdatedUser(user))
        setMessages(messages.concat(newMessage))
      }
      handleAsync()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMessage])

  // Deleted message received from postgres
  useEffect(() => {
    if (deletedMessage)
      setMessages(messages.filter((message: any) => message.id !== deletedMessage.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletedMessage])

  // New channel received from Postgres
  useEffect(() => {
    if (newChannel) setChannels(channels.concat(newChannel))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newChannel])

  // Deleted channel received from postgres
  useEffect(() => {
    if (deletedChannel)
      setChannels(channels.filter((channel: any) => channel.id !== deletedChannel.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletedChannel])

  // New or updated user received from Postgres
  useEffect(() => {
    if (newOrUpdatedUser) users.set(newOrUpdatedUser.id, newOrUpdatedUser)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newOrUpdatedUser])

  return {
    // We can export computed values here to map the authors to each message
    messages: messages.map((x: any) => ({ ...x, author: users.get(x.user_id) })),
    channels:
      channels !== null ? channels.sort((a: any, b: any) => a.slug.localeCompare(b.slug)) : [],
    users
  }
}

export default useStore
