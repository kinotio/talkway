export const getInitials = ({ user }: { user: TUser }): string => {
  if (user === null || user === undefined) return 'N/A'
  return user.fullname
    .match(/(\b\S)?/g)
    ?.join('')
    .toUpperCase() as string
}
