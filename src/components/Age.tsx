import { differenceInYears } from 'date-fns'

const birthDate = new Date(2001, 9, 7)

export default function Age() {
  const age = differenceInYears(new Date(), birthDate)

  return age
}
