import {makeStyles} from '@material-ui/core';

export default makeStyles((theme)=>({

    root: {
        display: 'flex',
        '& > * + *': {
          marginLeft: theme.spacing(2),
        },
      },
      appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      heading: {
        color: 'rgba(3, 78, 252)',
      },
      image: {
        marginLeft: '15px',
      },
      [theme.breakpoints.down('sm')]:{
        mainContainer:{
          flexDirection :"column-reverse"
      
        }
    
      }
      

}

))