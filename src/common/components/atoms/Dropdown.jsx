const Dropdown = () => 
    {

        const hStyle = 
        {
            display:'flex',
            flexDirection:'column',
            backgroundColor:'#ffffff',
            height:'fit-content',
            marginTop:'10px',
            width:'90%',
            height:'20%',
            borderRadius:'5px'
        }

        const dropStyle = 
        {
            height:'30px',
            marginRight:'15px',
            marginLeft:'15px',
            marginTop:'6px',
            borderRadius:'5px'
        }

        const lblStyle = {
            paddingTop:'15px',
            paddingLeft:'15px',
        }

        return(
            <div style={hStyle}>
                <label for="cars" style={lblStyle}><strong>Select Volunteer:</strong></label>
                <select style={dropStyle} name="cars" id="cars">
                <option value="null">Select Volunteer</option>
                <option value="madeleineyoung2029@u.northwestern.edu">Maddy Young</option>
                <option value="hayleymccormack2028@u.northwestern.edu">Hayley McCormack</option>
                <option value="kaylaxu@u.northwestern.">Kayla Xu</option>
                <option value="danahansari@u.northwestern.edu">Danah Ansari</option>
                <option value="aliviawynn@u.northwestern.edu">Alivia Wynn</option>
                <option value="benisaac@u.northwestern.edu">Ben Isaac</option>
                </select>
            </div>
        );
    };

export default Dropdown;