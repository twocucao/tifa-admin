import React, { useEffect, useRef, useState } from 'react'
import { GridContent } from '@ant-design/pro-layout'
import { Menu } from 'antd'
import BaseView from './components/base'
import BindingView from './components/binding'
import NotificationView from './components/notification'
import SecurityView from './components/security'
import styles from './style.module.less'

const { Item } = Menu
type AccountSettingsStateKeys = 'base' | 'security' | 'binding' | 'notification'

const Page = () => {
  const menuMap = {
    base: '基本设置',
    security: '安全设置',
    binding: '账号绑定',
    notification: '新消息通知',
  }

  const [menuKey, setMenuKey] = useState('base')

  const state = {
    mode: 'inline',
    menuMap,
  }
  const refMain = useRef(null)
  const { mode } = state
  const resize = () => {
    if (!refMain) {
      return
    }

    requestAnimationFrame(() => {
      if (!refMain) {
        return
      }

      let mode: 'inline' | 'horizontal' = 'inline'
      const { offsetWidth } = refMain.current

      if (offsetWidth < 641 && offsetWidth > 400) {
        mode = 'horizontal'
      }

      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = 'horizontal'
      }

      // this.setState({
      //     mode,
      // })
    })
  }
  useEffect(() => {
    resize()
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  const getMenu = () => {
    const { menuMap } = state
    // @ts-ignore
    return Object.keys(menuMap).map((item) => <Item key={item}>{menuMap[item]}</Item>)
  }
  const getRightTitle = () => {
    const { menuMap } = state
    // @ts-ignore
    return menuMap[menuKey]
  }
  // @ts-ignore
  const selectKey1 = (key: AccountSettingsStateKeys) => {
    // setState({
    //     selectKey: key,
    // })
  }

  const renderChildren = () => {
    switch (menuKey) {
      case 'base':
        return <BaseView />

      case 'security':
        return <SecurityView />

      case 'binding':
        return <BindingView />

      case 'notification':
        return <NotificationView />

      default:
        break
    }

    return null
  }

  return (
    <GridContent>
      <div className={styles.main} ref={refMain}>
        <div className={styles.leftMenu}>
          <Menu
            // @ts-ignore
            mode={mode}
            selectedKeys={[menuKey]}
            onClick={({ key }) => {
              // @ts-ignore
              selectKey1(key as AccountSettingsStateKeys)
            }}
          >
            {getMenu()}
          </Menu>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>{getRightTitle()}</div>
          {renderChildren()}
        </div>
      </div>
    </GridContent>
  )
}

export default Page
