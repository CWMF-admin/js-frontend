import PageHeader from '@/common/components/atoms/PageHeader';
import { BodyContainer } from '@/common/components/form/styles';
import AcknowForm from '@/common/components/form/AcknowForm';
import Dropdown from '@/common/components/atoms/Dropdown';

const Acknowledgements = () => {
    const styleBody = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    };
    const container = {
            display: 'grid',
            gridTemplateColumns: '0.8fr 1fr',
            gap: '5px',
        };

    const column = {
            padding: '10px',
            display: 'flex',
            justifyContent: 'center',
        }

    return(
        <div style ={styleBody}>
            <PageHeader title = "Acknowledgements"/>
            <BodyContainer>
            <div style={container}>
                <div style={column}><Dropdown/></div>
                <div style={column}><AcknowForm/></div>
            </div>
            </BodyContainer>
        </div>
    );
};

export default Acknowledgements;