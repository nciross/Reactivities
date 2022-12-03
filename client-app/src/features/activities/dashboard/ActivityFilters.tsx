import React from "react"
import Calendar from "react-calendar"

import { Header, Menu } from "semantic-ui-react";

export default function ActivitFilters() {
    return (
        <>
            <Menu vertical size='large' style={{ width: '100%', marginTo: 50 }} >
                <Header icon='filter' attached color='teal' content='Filters' />
                <Menu.Item content='All Activities' />
                <Menu.Item content="I'm going" />
                <Menu.Item content="I'm hoting" />
            </Menu>
            <Header />
            <Calendar />
        </>
    )
}