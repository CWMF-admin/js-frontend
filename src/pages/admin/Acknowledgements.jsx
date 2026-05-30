import PageHeader from '@/common/components/atoms/PageHeader';
import { BodyContainer } from '@/common/components/form/styles';
import AcknowForm from '@/common/components/form/AcknowForm';

const Acknowledgements = () => {
    const styleBody = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    };
    const container = {
            margin: '15px 30px 15px 30px',
        };

    const column = {
            padding: '5px',
            display: 'flex',
            justifyContent: 'center',
        }

    return(
        <div style ={styleBody}>
            <PageHeader title = "Acknowledgements"/>
            <BodyContainer>
            <div style={container}>
                <div style={column}><AcknowForm/></div>
            </div>
            </BodyContainer>
        </div>
    );
};

export default Acknowledgements;