import * as React from 'react'
import { Text } from '@fluentui/react'
// import { Label } from '@fluentui/react'
import { PrimaryButton } from '@fluentui/react'
// import { DefaultButton } from '@fluentui/react'
import { ProgressIndicator } from '@fluentui/react/lib/ProgressIndicator'
// import { SpinButton, ISpinButtonStyles } from '@fluentui/react/lib/SpinButton'
// import './scheduler.module.css'
import styles from './scheduler.module.css'

const intervalDelay = 1000 // ms

const timers = [
  {
    name: 'work',
    description: 'work 5h/day',
    goal: {
      countdown: 5 * 60 * 60,
    },
  },
  {
    name: 'exercise',
    description: 'do 1 exercise/day',
    goal: {},
  },
  {
    name: 'neomem',
    description: 'work 1h/day',
    goal: {
      countdown: 1 * 60 * 60,
    },
  },
]

// const styles = { spinButtonWrapper: { width: 75 } }

function Scheduler() {
  return (
    <div className={styles.scheduler}>
      <table>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th>
              <Text>Complete</Text>
            </th>
            <th>
              <Text>Minutes Complete</Text>
            </th>
            <th>
              <Text>Minutes Remaining</Text>
            </th>
          </tr>
        </thead>
        <tbody>
          {timers.map(timer => (
            <Timer timer={timer} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Timer({ timer }) {
  const [percentComplete, setPercentComplete] = React.useState(0)
  const [timerOn, setTimerOn] = React.useState(false)

  React.useEffect(() => {
    const intervalIncrement = 1000 / ((timer.goal.countdown || 1) * 1000)
    const id = setInterval(() => {
      if (timerOn && percentComplete < 1) {
        setPercentComplete(percentComplete + intervalIncrement)
      }
    }, intervalDelay)
    return () => {
      clearInterval(id)
    }
  })

  function toggleTimer() {
    setTimerOn(!timerOn)
  }

  return (
    <tr>
      <td>
        {/* <PrimaryButton onClick={toggleTimer}>{timer.name}</PrimaryButton> */}
        {/* <Label htmlFor={timer.name}>{timer.name}</Label> */}
        <Text variant="large" style={{ fontWeight: 'bold' }}>
          {timer.name}
        </Text>
        <br />
        <Text>{timer.description}</Text>
      </td>
      {/* <DefaultButton>Good evening</DefaultButton> */}
      {/* <SpinButton
        label="Work Goal"
        defaultValue="0"
        disabled={true}
        min={0}
        max={100}
        step={1}
        incrementButtonAriaLabel="Increase value by 1"
        decrementButtonAriaLabel="Decrease value by 1"
        styles={styles}
      /> */}
      <td>
        <PrimaryButton onClick={toggleTimer}>start/stop</PrimaryButton>
      </td>
      <td className={styles.progress}>
        <ProgressIndicator
          id={timer.name}
          // label={timer.name}
          // description={timer.description}
          percentComplete={percentComplete}
        />
      </td>
      <td>
        <Text>{Math.floor(percentComplete * 100)}%</Text>
      </td>
      <td>
        <Text>
          {Math.floor((percentComplete * timer.goal.countdown * 10) / 60) / 10}
        </Text>
      </td>
      <td>
        <Text>
          {Math.floor(
            ((1 - percentComplete) * timer.goal.countdown * 10) / 60
          ) / 10}
        </Text>
      </td>
    </tr>
  )
}

export default Scheduler
