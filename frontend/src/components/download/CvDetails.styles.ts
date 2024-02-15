import { StyleSheet, Font } from '@react-pdf/renderer';
import { Colors } from '../../styles/variable';

Font.register({
  family: 'Source Sans Pro-bold',
  src: new URL(
    '../../assets/styles/font/SourceSansPro-Bold.woff',
    import.meta.url,
  ).pathname,
});

Font.register({
  family: 'Source Sans Pro-semibold',
  src: new URL(
    '../../assets/styles/font/SourceSansPro-Semibold.woff',
    import.meta.url,
  ).pathname,
});

Font.register({
  family: 'Source Sans Pro-regular',
  src: new URL(
    '../../assets/styles/font/SourceSansPro-Regular.woff',
    import.meta.url,
  ).pathname,
});

Font.register({
  family: 'Pluto Sans-regular',
  src: new URL(
    '../../assets/styles/font/PlutoSans-Regular.woff',
    import.meta.url,
  ).pathname,
});

const styles = StyleSheet.create({
  screen: {
    height: '100vh',
    width: '100%',
  },
  contentContainer: {
    paddingRight: 20,
    marginBottom: 20,
  },
  page: {
    paddingVertical: '20px',
    paddingHorizontal: '20px',
    position: 'relative',
  },
  futureProspectsLogo: {
    width: 180,
    height: 'auto',
    margin: '0 auto',
  },
  resumeLogo: {
    width: 100,
    height: 'auto',
    alignItems: 'flex-end',
    marginBottom: 20,
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginTop: 5,
  },

  title: {
    fontSize: 12,
    margin: '20px 0 10',
    textTransform: 'capitalize',
    color: `${Colors.PANTONE_BLACK_66}`,
    fontWeight: 'bold',
    fontFamily: 'Source Sans Pro-bold',
  },

  basicProfileContainer: {
    fontSize: '12px',
    color: `${Colors.GREY}`,
    margin: '20px 0 10px 0',
    fontFamily: 'Source Sans Pro-regular',
  },
  profileTitle: {
    fontWeight: 'bold',
    color: '#58474c',
    padding: '10px 0',
    fontFamily: 'Source Sans Pro-bold',
  },

  profileItem: {
    paddingTop: 3,
  },
  name: {
    color: `${Colors.BLACK}`,
    fontWeight: 700,
    textTransform: 'capitalize',
    padding: '3px 0',
  },
  emailContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  emailLabel: {
    fontWeight: 'bold',
  },
  email: {
    color: Colors.LI_GREEN,
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    fontSize: 10,
    marginTop: 20,
    textAlign: 'center',
    width: '100%',
    color: `${Colors.PANTONE_BLACK_66}`,
    fontWeight: 'bold',
    fontFamily: 'Source Sans Pro-bold',
  },
  underline: {
    borderTop: 1,
    marginBottom: 5,
  },
  bottomUnderline: {
    borderBottomWidth: 1,
    width: '96.5%',
    position: 'absolute',
    bottom: 18,
    fontSize: 10,
    left: '3.5%',
    marginTop: 4,
    marginBottom: 10,
  },
});

const adminCvDetailsStyles = StyleSheet.create({
  heading: {
    color: `${Colors.LI_GREEN}`,
    fontWeight: 'bold',
    paddingTop: 15,
    fontSize: '14px',
    fontFamily: 'Source Sans Pro-bold',
  },
  paragraphText: {
    paddingTop: 10,
    fontSize: '12px',
    width: 600,
    paddingRight: 50,
    fontFamily: 'Source Sans Pro-regular',
  },
  text: {
    fontSize: '12px',
    fontFamily: 'Source Sans Pro-regular',
    paddingTop: 10,
  },
  list: {
    flexDirection: 'row',
    paddingTop: 10,
    fontFamily: 'Source Sans Pro-regular',
    paddingLeft: 20,
  },
  bulletPoint: {
    width: 10,
    fontSize: 10,
  },
  listContent: {
    // flex: 1,
    fontSize: 10,
    fontFamily: 'Source Sans Pro-regular',
  },
  image: {
    margin: '12px 0',
    width: 100,
  },

  code: {
    fontFamily: 'Source Sans Pro-regular',
    paddingTop: 10,
  },
  pre: {
    fontFamily: 'Source Sans Pro-regular',
    paddingTop: 10,
  },
  blockQuote: {
    fontFamily: 'Source Sans Pro-semibold',
    paddingTop: 10,
  },
  strong: {
    fontSize: '12px',
    fontWeight: 'semibold',
    paddingTop: 10,
    fontFamily: 'Source Sans Pro-semibold',
    // fontFamily: FontFamily.SOURCESANS_SEMI_BOLD,
  },
});

export { styles, adminCvDetailsStyles };
