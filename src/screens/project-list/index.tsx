import React from "react";
import { useState } from "react";
import { SearchPanel } from "./searchPanel";
import { List } from "./list";
import { useDebounce } from "utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";


export const ProjectListScreen = () =>{
  const [param,setParam] = useState({
    name: '',
    personId: ''
  })
  const debounceParam = useDebounce(param,200)
  const {isLoading, error, data:list} = useProjects(debounceParam)
  const {data: users} = useUsers()
  
  return (
  <Container>
    <h1>项目列表</h1>
    <SearchPanel users={users || []} param={param} setParam={setParam} />
    {error ? <Typography.Text type={"danger"}>{error.message}</Typography.Text> : null}
    <List loading={isLoading} users={users || []} dataSource={list || []} />
  </Container>
  )
}
const Container = styled.div`
padding: 3.2rem;
`

// function client(arg0: string) {
//   throw new Error("Function not implemented.");
// }
