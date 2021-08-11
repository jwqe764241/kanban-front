import { useState } from "react";
import { useRouter } from "next/router";
import axios, { createRequester } from "core/apiAxios";
import { useSelector, useDispatch } from "react-redux";

import { Label, Input, InputWrap } from "components/layout/Form";
import { Header, Body } from "components/layout/Page";
import { ContainerMd } from "components/layout/Container";
import { SuccessButton } from "components/layout/Button";

function New() {
  const router = useRouter();
  const { token } = useSelector((state) => state);
  const dispatch = useDispatch();
  const requester = createRequester(axios, dispatch);

  const [isProgressed, setIsProgressed] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleCreate = async () => {
    setIsProgressed(true);
    try {
      const response = await requester.post("/project", data, {}, token);
      if (response.status === 201) {
        router.push("/");
      }
    } catch (e) {
      const errorResponse = e.response;
      if (errorResponse.status === 409) {
        alert("Project name already exist, please use another name");
      }
    }
    setIsProgressed(false);
  };

  return (
    <ContainerMd>
      <Header title="New Project" description="Create new project." />
      <Body>
        <InputWrap>
          <Label block>Name</Label>
          <Input
            id="name"
            type="text"
            name="name"
            style={{ width: "300px" }}
            value={data.name}
            onChange={onChange}
          />
        </InputWrap>
        <InputWrap>
          <Label block>Description</Label>
          <Input
            id="description"
            type="text"
            name="description"
            value={data.description}
            onChange={onChange}
          />
        </InputWrap>
        {isProgressed ? (
          <SuccessButton type="button" style={{ width: "140px" }} disabled>
            Creating...
          </SuccessButton>
        ) : (
          <SuccessButton
            type="button"
            style={{ width: "140px" }}
            onClick={handleCreate}
          >
            Create project
          </SuccessButton>
        )}
      </Body>
    </ContainerMd>
  );
}

export default New;
