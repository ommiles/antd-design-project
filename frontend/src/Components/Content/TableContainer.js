import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Input, Modal, Form, Popconfirm, Typography } from 'antd';
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from 'react-sortable-hoc';
import { MenuOutlined } from '@ant-design/icons';
import arrayMove from 'array-move';
import defaultProjectIcon_2x from '../../Assets/defaultProjectIcon_2x.png';
import PlusSign from '../../Assets/Plus Sign.svg';
import Question from '../../Assets/Question.svg';
import { fetchProjects, sortProjects, editProjects } from '../../Actions/projectActions';

export const TableContainer = () => {
  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  const dispatch = useDispatch();
  const data = useSelector(state => state.projects.projects);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [itemSelected, setItemSelected] = useState(null);
  const [dataSource, setDataSource] = useState(data);
  const [count, setCount] = useState(data.length);

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const isEditing = record => record.id === editingKey;

  const DragHandle = sortableHandle(() => (
    <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />
  ));

  const ProjectIcon = () => (
    <span
      role='img'
      aria-label='menu'
      className='anticon anticon-menu grey'
      style={{ cursor: 'pointer' }}
    >
      <img
        src={defaultProjectIcon_2x}
        alt='Project Icon'
        style={{ height: '2.5em' }}
      ></img>
    </span>
  );

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            <Input />
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const columns = [
    {
      title: 'Sort',
      dataIndex: 'sort',
      width: '2%',
      className: 'drag-visible align-center',
      render: () => <DragHandle />,
    },
    {
      title: '',
      dataIndex: 'project-icon',
      width: '2%',
      className: 'drag-visible',
      render: () => <ProjectIcon />,
    },
    {
      title: 'Project Title',
      dataIndex: 'project_name',
      className: 'drag-visible',
      width: '15%',
      editable: true,
    },
    {
      title: 'Edit',
      dataIndex: 'edit',
      width: '10%',
      render: (_, record) => {
        const editable = isEditing(record);
        console.log(editable)
        return editable ? (
          <span>
            <Typography.Link
              // href='javascript:;'
              onClick={() => handleSave(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title='Sure to cancel?' onConfirm={handleCancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          // <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
          //   Edit
          // </Typography.Link>
          <span
            role='img'
            aria-label='menu'
            className='anticon anticon-menu grey'
            style={{ cursor: 'pointer' }}
          >
            <div
              className='edit-icon'
              style={{ height: '1.5em', width: '1.5em' }}
              // onClick={handleEdit}
              onClick={() => handleEdit(record)}
            ></div>
          </span>
        );
      },
    },
    {
      title: 'Date Added',
      // dataIndex: 'updated_at',
      width: '70%',
      className: 'align-end grey',
      render: (_, record) => new Date(record.created_at).toString(),
    },
    {
      title: '',
      dataIndex: 'operation',
      width: '2%',
      render: (_, record) =>
        data.length >= 1 ? (
          <div
            className='delete-icon'
            style={{
              height: '1.5em',
              width: '1.5em',
              cursor: 'pointer',
              color: 'rgb(153, 153, 153)',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
            onClick={() => handleDelete(record)}
          ></div>
        ) : null,
    },
  ];

  const SortableItem = sortableElement(props => <tr {...props} />);
  const SortableContainer = sortableContainer(props => <tbody {...props} />);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMove([].concat(data), oldIndex, newIndex).filter(
        el => !!el
      );
      console.log('Sorted items: ', newData);
      dispatch(sortProjects(newData));
    }
  };

  const DraggableContainer = props => (
    <SortableContainer
      useDragHandle
      disableAutoscroll
      helperClass='row-dragging'
      onSortEnd={onSortEnd}
      {...props}
    />
  );

  const DraggableBodyRow = ({ className, style, ...restProps }) => {
    // function findIndex is based on Table rowKey props and should always be a right array index
    const index = data.findIndex(x => x.id === restProps['data-row-key']);
    return <SortableItem index={index} {...restProps} />;
  };

  const handleAdd = () => {
    const newData = {
      key: count.to_s,
      name: '',
      date: new Date(),
      index: count,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleEdit = record => {
    form.setFieldsValue({
      name: '',
      ...record,
    });
    setEditingKey(record.id);
  };

  const handleSave = async id => {
    console.log(id)
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex(item => editingKey === item.id);

      console.log(row) // {project_name: ''}
      console.log(row.project_name) // ''
      console.log(newData) // copy of data array
      console.log(index) // index of item in new copied array
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        dispatch(editProjects(id, row.project_name))
        // setDataSource(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        // setDataSource(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed: ', errInfo);
    }
  };

  const handleCancel = () => {
    setEditingKey('');
  };

  const handleDelete = record => {
    setModalVisibility(true);
    setItemSelected(record.key);
  };

  const modalOnOk = () => {
    setDataSource(dataSource.filter(item => item.key !== itemSelected));
    setModalVisibility(false);
  };

  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: record => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div>
      <Modal
        visible={modalVisibility}
        onOk={() => modalOnOk()}
        onCancel={() => setModalVisibility(false)}
        okText='Yes'
        cancelText='No'
      >
        <div style={{ display: 'flex' }}>
          <img
            src={Question}
            alt='Question Mark'
            style={{ width: 20, height: 20, margin: 5 }}
          ></img>
          <div>
            <h3>Are you sure you want to delete this project?</h3>
            <p>This action can't be undone.</p>
          </div>
        </div>
      </Modal>
      <div
        style={{
          borderBottom: '.5px solid lightgrey',
          marginTop: 30,
          display: 'flex',
          justifyContent: 'flex-end',
          position: 'relative',
          alignItems: 'center',
        }}
      >
        <div
          className='button-container'
          style={{
            padding: 24,
            position: 'absolute',
            marginRight: 24,
            cursor: 'pointer',
            zIndex: 2,
          }}
          onClick={handleAdd}
        >
          <img
            src={PlusSign}
            alt='Add Button'
            style={{ position: 'absolute' }}
          ></img>
        </div>
      </div>
      <Form form={form} component={false}>
        <Table
          pagination={false}
          dataSource={data}
          columns={mergedColumns}
          rowKey='id'
          rowClassName='editable-row'
          components={{
            body: {
              wrapper: DraggableContainer,
              row: DraggableBodyRow,
              cell: EditableCell,
            },
          }}
        />
      </Form>
    </div>
  );
};
