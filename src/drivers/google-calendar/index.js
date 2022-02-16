import ApiCalendar from 'react-google-calendar-api'

export async function foo() {
  ApiCalendar.handleAuthClick()
    .then(() => {
      console.log('sign in succesful!')
      if (ApiCalendar.sign) {
        ApiCalendar.listUpcomingEvents(10).then(({ result }) => {
          console.log(result.items)
        })
      }
    })
    .catch(e => {
      console.error(`sign in failed`, e)
    })
}
