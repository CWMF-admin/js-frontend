import Paperclip from '../../../assets/images/Paperclip.svg';

const AcknowForm = () => 
    {

        const sendStyle = 
        {
            display:'flex',
            justifyContent:'right',
            alignItems:'center',
            gap:'8px',
        };
        const utilStyle = 
        {
            display:'flex',
            justifyContent:'left',
            alignItems:'center',
        };
        const buttonCont = 
        {
            display:'flex',
            justifyContent: 'space-between',
        }
        const imgStyle = 
        {
            width: '16px',
        }

        return(
            <div class="container">
                <form>
                    <label for="subject"><strong>Acknowledgement Letter</strong></label>
                    <textarea id="subject" name="subject" placeholder="Write something.."></textarea>
                    <div style={buttonCont}>
                        <span style={sendStyle}><input type="submit" value="+"/>
                        <input type='image'style={imgStyle} src={Paperclip} alt=""></input></span>
                        <span style={utilStyle}><input type="submit" value="Send Email"/></span>
                    </div>
                </form>
            </div>
        );
    };

export default AcknowForm;