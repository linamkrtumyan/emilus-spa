import { APP_PREFIX_PATH } from 'configs/AppConfig'

const extraNavTree = [
  {
    key: 'extra',
    path: `${APP_PREFIX_PATH}/pages`,
    title: 'sidenav.pages',
    breadcrumb: true,
    isGroupTitle: true,
    submenu: [
      {
        key: 'extra-pages',
        path: `${APP_PREFIX_PATH}/pages`,
        title: 'sidenav.pages',
        breadcrumb: true,
        submenu: [
          {
            
            key: 'extra-pages-list',
            path: `${APP_PREFIX_PATH}/pages/user-list`,
            title: 'sidenav.pages.userlist',
            icon: '',
            breadcrumb: true,
            submenu: []
          },
        
        ]
      },
           
    ]
  }
]

const navigationConfig = [
  ...extraNavTree,
]

export default navigationConfig;
