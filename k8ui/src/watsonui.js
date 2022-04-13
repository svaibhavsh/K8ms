import React from 'react';
// component with watson data
const WatsonUI = ({ watsonResponse, UsrRequest }) => {
    return (
        <div>
            <h2>Watson Conversation</h2>

            <div className="container darker">
                <img src="/watson.png" alt="Avatar" className="left" />
                {watsonResponse.data &&

                    <p>{watsonResponse.data.output.generic[0].text}</p>
                }

            </div>
        </div>
    )
}

export default WatsonUI;
