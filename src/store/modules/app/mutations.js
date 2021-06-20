import { set, toggle } from '@/utils/vuex'

export default {
    setDrawer: set('drawer'),
    setIsDrawer: set('isDrawer'),
    setPathName: set('pathName'),
    toggleDrawer: toggle('drawer')
}