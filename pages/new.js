import { useState } from "react";
import { useRouter } from "next/router";
import axios, { createRequester } from "core/apiAxios";
import { useSelector, useDispatch } from "react-redux";

import { Input, TextArea, Label, InputWrap } from "components/layout/Form";
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
  const [errors, setErrors] = useState();

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
      const response = await requester.post("/projects", data, token);
      if (response.status === 201) {
        router.push("/");
      }
    } catch (e) {
      const errorResponse = e.response;
      if (errorResponse.status === 400) {
        setErrors(errorResponse.data.data);
      } else if (errorResponse.status === 409) {
        alert("Project name already exist, please use another name");
      } else {
        alert("Unknown error.");
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
            errors={errors}
          />
        </InputWrap>
        <InputWrap>
          <Label block>Description</Label>
          <TextArea
            id="description"
            name="description"
            style={{ height: "100px" }}
            value={data.description}
            onChange={onChange}
            errors={errors}
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

export async function getServerSideProps() {
  return { props: {} };
}

export default New;
