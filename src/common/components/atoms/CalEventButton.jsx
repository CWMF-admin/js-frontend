function CalEventButton({eventName, signedUp, capacity})
{ 
    const eventBStyle =
    {
        color: '#C40000',
        backgroundColor: '#FFCDCD',
        borderRadius: '5px',
        borderColor: '#C40000',
        textAlign: 'left',
        cursor: 'pointer',
    };

    return(
        <button style={eventBStyle}>Grocery Giveaway <span>8/10</span></button>
    );
};

export default CalEventButton;