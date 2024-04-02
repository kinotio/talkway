export const getInitials = ({ user }: { user: TUser | undefined }): string => {
  if (user === null || user === undefined) return 'N/A'
  return user.fullname
    .match(/(\b\S)?/g)
    ?.join('')
    .toUpperCase() as string
}

export const getSlugifiedChannelName = ({ channelName }: { channelName: string }): string => {
  return channelName
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}
