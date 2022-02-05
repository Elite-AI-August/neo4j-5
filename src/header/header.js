// import { CommandBar } from '@fluentui/react'

// const menuItems = [
//   {
//     key: 'logo',
//     text: 'Neomem',
//   },
//   {
//     key: 'newItem',
//     text: 'New',
//     cacheKey: 'myCacheKey', // changing this key will invalidate this item's cache
//     iconProps: { iconName: 'Add' },
//     subMenuProps: {
//       items: [
//         {
//           key: 'emailMessage',
//           text: 'Email message',
//           iconProps: { iconName: 'Mail' },
//           // ['data-automation-id']: 'newEmailButton', // optional
//         },
//         {
//           key: 'calendarEvent',
//           text: 'Calendar event',
//           iconProps: { iconName: 'Calendar' },
//         },
//       ],
//     },
//   },
// ]
// const farMenuItems = [{ text: 'Login' }]

function Header() {
  // return <CommandBar items={menuItems} farItems={farMenuItems} />
  return <h1>Neomem</h1>
}

export default Header
