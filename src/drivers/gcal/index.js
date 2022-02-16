// proof of concept gcal fetching
// this works, but requires 'apiGoogleconfig.json' in root dir,
// with credentials, which would get baked into the react app. no thx.
// so will need to manage credentials some other way.

//. this is some simplification library anyway - use google's real library.

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
