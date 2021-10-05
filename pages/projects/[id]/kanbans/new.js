import { useState } from "react";
import { useRouter } from "next/router";
import axios, { createRequester } from "core/apiAxios";
import { useSelector, useDispatch } from "react-redux";

import { Input, TextArea, Label, InputWrap } from "components/layout/Form";
import { Header, Body } from "components/layout/Page";
import { ContainerMd } from "components/layout/Container";
import { SuccessButton } from "components/layout/Button";

const NewKanban = () => {
  const router = useRouter();
  const { id } = router.query;
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
      const response = await requester.post(
        `/projects/${id}/kanbans`,
        data,
        token,
      );
      if (response.status === 201) {
        const { projectId, sequenceId } = response.data;
        router.push(`/projects/${projectId}/kanbans/${sequenceId}`);
      }
    } catch (e) {
      const errorResponse = e.response;
      if (errorResponse.status === 400) {
        setErrors(errorResponse.data.data);
      } else if (errorResponse.status === 403) {
        alert("Use hanve no permission to do this.");
      } else {
        alert("Unknown error.");
      }
    }

    setIsProgressed(false);
  };

  return (
    <ContainerMd>
      <Header title="New Kanban" description="Create new kanban." />
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
            Create kanban
          </SuccessButton>
        )}
      </Body>
    </ContainerMd>
  );
};

export default NewKanban;
