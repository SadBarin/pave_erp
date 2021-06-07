module.exports = {
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? '/pave-erp-demo/'
  //   : '/',

  pwa: {
    name: 'PaveERP',
    themeColor: 'hsl(208, 79%, 51%)',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // настройки манифеста
    manifestOptions: {
      display: 'landscape',
      background_color: 'hsl(208, 79%, 51%)'
      // ...другие настройки манифеста...
    }
  }
}
