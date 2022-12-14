/* eslint-disable jsx-a11y/anchor-is-valid */
import styled from "@emotion/styled"
import { Row } from "components/lib"
import { useAuth } from "context/auth-context"
import { ProjectListScreen } from "screens/project-list"
import {ReactComponent as SoftwareLogo} from "assets/software-logo.svg"
import { Button, Dropdown, Menu } from "antd"



export const AuthenticatedApp = () =>{
  const {logout,user} = useAuth()
  return (
      <Container>
    <Header between={true}>
      <HeaderLeft gap={true}>
        <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'}/>
        <h2>项目</h2>
        <h2>用户</h2>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown overlay={
          <Menu>
            <Menu.Item key={'logout'}>
              <Button type={"link"}  onClick={logout}>登出</Button>
            </Menu.Item>
          </Menu>}>
          <Button type={"link"} onClick={e => e.preventDefault()}>
            Hi, {user?.name}
          </Button>
        </Dropdown>
      </HeaderRight>
    </Header>
    <Main>
      <ProjectListScreen/> 
    </Main>
  </Container>
  )

}

const Container = styled.div`
display: grid;
grid-template-rows:6rem 1fr;
grid-template-areas: 
"header"
"main"
;
height: 100vh;
`

const Header = styled(Row)`
padding: 3.2rem;
`
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div`
display: flex;
align-items: center;
`
const Main = styled.main`grid-area: main`