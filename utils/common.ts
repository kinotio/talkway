export const getInitials = ({ user }: { user: TUser | undefined }): string => {
  if (user === null || user === undefined) return 'N/A'
  return user.fullname
    .match(/(\b\S)?/g)
    ?.join('')
    .toUpperCase() as string
}
