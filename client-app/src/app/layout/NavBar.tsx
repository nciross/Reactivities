import React from 'react'
import { Button, Container, Menu } from "semantic-ui-react";
interface Props {
    formOpen: (id?: string) => void
}
export default function NavBar({ formOpen }: Props) {
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src='/assetes/logo.png' alt='logo' style={{ marginRight: '10px' }} />
                    Activities
                </Menu.Item>
                <Menu.Item name='Activities' />
                <Menu.Item>
                    <Button onClick={() => formOpen()} positive content='Create Activity' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}