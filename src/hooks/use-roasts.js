"use client"

import { useCallback } from "react"

const ROASTS_KEY = "roast_leaderboard"
const CUSTOM_ROASTS_KEY = "custom_roasts"
const FRIENDS_KEY = "friends_list"
const MESSAGES_KEY = "roast_messages"
const USER_KEY = "current_user"
const INVITES_KEY = "invite_codes"

export function useRoasts() {
  const getLeaderboard = useCallback(() => {
    if (typeof window === "undefined") return {}
    const data = localStorage.getItem(ROASTS_KEY)
    return data ? JSON.parse(data) : {}
  }, [])

  const addRoast = useCallback(
    (friendName) => {
      if (typeof window === "undefined") return
      const leaderboard = getLeaderboard()
      leaderboard[friendName] = (leaderboard[friendName] || 0) + 1
      localStorage.setItem(ROASTS_KEY, JSON.stringify(leaderboard))
      window.dispatchEvent(new Event("roastUpdated"))
    },
    [getLeaderboard],
  )

  const getCustomRoasts = useCallback(() => {
    if (typeof window === "undefined") return []
    const data = localStorage.getItem(CUSTOM_ROASTS_KEY)
    return data ? JSON.parse(data) : []
  }, [])

  const addCustomRoast = useCallback(
    (roast) => {
      if (typeof window === "undefined") return
      const roasts = getCustomRoasts()
      roasts.push(roast)
      localStorage.setItem(CUSTOM_ROASTS_KEY, JSON.stringify(roasts))
    },
    [getCustomRoasts],
  )

  const removeCustomRoast = useCallback(
    (index) => {
      if (typeof window === "undefined") return
      const roasts = getCustomRoasts()
      roasts.splice(index, 1)
      localStorage.setItem(CUSTOM_ROASTS_KEY, JSON.stringify(roasts))
    },
    [getCustomRoasts],
  )

  const getCurrentUser = useCallback(() => {
    if (typeof window === "undefined") return null
    const data = localStorage.getItem(USER_KEY)
    return data ? JSON.parse(data) : null
  }, [])

  const setCurrentUser = useCallback((username) => {
    if (typeof window === "undefined") return
    localStorage.setItem(USER_KEY, JSON.stringify({ username: username, id: Date.now() }))
    window.dispatchEvent(new Event("userUpdated"))
  }, [])

  const getFriends = useCallback(() => {
    if (typeof window === "undefined") return []
    const data = localStorage.getItem(FRIENDS_KEY)
    return data ? JSON.parse(data) : []
  }, [])

  const addFriend = useCallback(
    (friendName) => {
      if (typeof window === "undefined") return
      const friends = getFriends()
      const exists = friends.find((f) => f.name === friendName)
      if (!exists) {
        friends.push({ name: friendName, id: Date.now(), addedAt: new Date().toISOString() })
        localStorage.setItem(FRIENDS_KEY, JSON.stringify(friends))
        window.dispatchEvent(new Event("friendsUpdated"))
      }
    },
    [getFriends],
  )

  const removeFriend = useCallback(
    (friendName) => {
      if (typeof window === "undefined") return
      const friends = getFriends()
      const filtered = friends.filter((f) => f.name !== friendName)
      localStorage.setItem(FRIENDS_KEY, JSON.stringify(filtered))
      window.dispatchEvent(new Event("friendsUpdated"))
    },
    [getFriends],
  )

  const sendRoast = useCallback(
    (toFriend, roastText) => {
      if (typeof window === "undefined") return
      const messages = localStorage.getItem(MESSAGES_KEY)
      const allMessages = messages ? JSON.parse(messages) : []
      const currentUser = getCurrentUser()
      const username = currentUser && currentUser.username ? currentUser.username : "Anonymous"

      const message = {
        id: Date.now(),
        from: username,
        to: toFriend,
        text: roastText,
        timestamp: new Date().toISOString(),
        read: false,
      }

      allMessages.push(message)
      localStorage.setItem(MESSAGES_KEY, JSON.stringify(allMessages))
      window.dispatchEvent(new Event("messageReceived"))
    },
    [getCurrentUser],
  )

  const getReceivedRoasts = useCallback(() => {
    if (typeof window === "undefined") return []
    const messages = localStorage.getItem(MESSAGES_KEY)
    const allMessages = messages ? JSON.parse(messages) : []
    const currentUser = getCurrentUser()
    const username = currentUser && currentUser.username ? currentUser.username : null

    if (!username) return []

    return allMessages.filter((m) => m.to === username).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  }, [getCurrentUser])

  const markRoastAsRead = useCallback((messageId) => {
    if (typeof window === "undefined") return
    const messages = localStorage.getItem(MESSAGES_KEY)
    const allMessages = messages ? JSON.parse(messages) : []

    const message = allMessages.find((m) => m.id === messageId)
    if (message) {
      message.read = true
      localStorage.setItem(MESSAGES_KEY, JSON.stringify(allMessages))
      window.dispatchEvent(new Event("messageRead"))
    }
  }, [])

  const getUnreadCount = useCallback(() => {
    if (typeof window === "undefined") return 0
    const messages = localStorage.getItem(MESSAGES_KEY)
    const allMessages = messages ? JSON.parse(messages) : []
    const currentUser = getCurrentUser()
    const username = currentUser && currentUser.username ? currentUser.username : null

    if (!username) return 0

    return allMessages.filter((m) => m.to === username && !m.read).length
  }, [getCurrentUser])

  const generateInviteCode = useCallback(() => {
    if (typeof window === "undefined") return null
    const currentUser = getCurrentUser()
    if (!currentUser) return null

    const code = Math.random().toString(36).substring(2, 8).toUpperCase()
    const invites = localStorage.getItem(INVITES_KEY)
    const allInvites = invites ? JSON.parse(invites) : []

    allInvites.push({
      code: code,
      createdBy: currentUser.username,
      createdAt: new Date().toISOString(),
      usedBy: [],
    })

    localStorage.setItem(INVITES_KEY, JSON.stringify(allInvites))
    return code
  }, [getCurrentUser])

  const getInviteLink = useCallback(() => {
    if (typeof window === "undefined") return null
    const code = generateInviteCode()
    if (!code) return null

    const baseUrl = window.location.origin + window.location.pathname
    return `${baseUrl}?invite=${code}`
  }, [generateInviteCode])

  const processInviteCode = useCallback(
    (code, friendUsername) => {
      if (typeof window === "undefined") return false

      const invites = localStorage.getItem(INVITES_KEY)
      const allInvites = invites ? JSON.parse(invites) : []

      const invite = allInvites.find((i) => i.code === code)
      if (!invite) return false

      // Add the friend who created the invite
      addFriend(invite.createdBy)

      // Mark invite as used
      invite.usedBy.push(friendUsername)
      localStorage.setItem(INVITES_KEY, JSON.stringify(allInvites))

      return true
    },
    [addFriend],
  )

  return {
    getLeaderboard: getLeaderboard,
    addRoast: addRoast,
    getCustomRoasts: getCustomRoasts,
    addCustomRoast: addCustomRoast,
    removeCustomRoast: removeCustomRoast,
    getCurrentUser: getCurrentUser,
    setCurrentUser: setCurrentUser,
    getFriends: getFriends,
    addFriend: addFriend,
    removeFriend: removeFriend,
    sendRoast: sendRoast,
    getReceivedRoasts: getReceivedRoasts,
    markRoastAsRead: markRoastAsRead,
    getUnreadCount: getUnreadCount,
    generateInviteCode: generateInviteCode,
    getInviteLink: getInviteLink,
    processInviteCode: processInviteCode,
  }
}
