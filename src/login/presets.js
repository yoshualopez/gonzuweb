import style from '../styles';
export default {
  input : {
    border : 'none',
    fontFamily :  style.font.monospace,
    color : style.colors.blackSoft,
    borderRadius : style.radius.input,
    padding : style.padding.inputText,
    background : style.background.white,
    fontSize : style.fontSize.redactionMin,
    boxShadow : style.shadow.soft15,
    outline : 'none'
  },
  inputWrong : {
    border : 'none',
    fontFamily :  style.font.monospace,
    color : style.colors.danger,
    borderRadius : style.radius.input,
    padding : style.padding.inputText,
    background : style.background.white,
    fontSize : style.fontSize.redactionMin,
    boxShadow : style.shadow.soft15Danger,
    outline : 'none'
  },
  title : {
    fontFamily :  style.font.cursive,
    fontSize : style.fontSize.title,
    color : style.colors.blackSoft
  },
  fields : {
    fontFamily :  style.font.sansSerif,
    fontSize : style.fontSize.subTitle,
    color : style.colors.blackSoft
  },
  backContentStyl : {
    background : style.background.PrimaryDark,
    color : 'white',
    padding : style.padding.button
  }
}