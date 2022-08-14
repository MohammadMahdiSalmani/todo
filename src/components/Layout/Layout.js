import React from "react";
import Wrapper from "../../hoc/Wrapper/Wrapper";
import Tasks from "../Tasks/Tasks";
import Add from "../Add/Add";

import "./Layout.css";

class Layout extends React.Component {
    render() {
        return (
            <Wrapper>
                <main>
                    <Add />
                    <Tasks />
                </main>
            </Wrapper>
        )
    }
}

export default Layout