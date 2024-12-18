import React, { useMemo, useState } from "react";
import { Button, ConfigProvider, Table } from "antd";
import Loading from "../LoadingComponent/Loading";
import { FileExcelOutlined } from "@ant-design/icons";
import { Excel } from "antd-table-saveas-excel";
import ModalComponent from "../ModalComponent/ModalComponent";

const TableComponent = (props) => {
  const {
    selectionType = "checkbox",
    data: dataSource = [],
    isLoading = false,
    columns = [],
    handleDeleteMany,
  } = props;

  const [rowSelectedKeys, setRowSelectedKeys] = useState([]);
  const [isModalOpenDeleteMany, setIsModalOpenDeleteMany] = useState(false);
  const newColumnExport = useMemo(() => {
    const arr = columns?.filter((column) => column.dataIndex !== "action");
    return arr;
  }, [columns]);

  const exportExcel = () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(newColumnExport)
      .addDataSource(dataSource, {
        str2Percent: false,
      })
      .saveAs("Excel.xlsx");
  };

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelectedKeys(selectedRowKeys);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  const handleDeleteAll = () => {
    handleDeleteMany(rowSelectedKeys);
    setRowSelectedKeys([]);
    setIsModalOpenDeleteMany(false);
  };

  return (
    <Loading isLoading={isLoading}>
      <Button
        onClick={exportExcel}
        style={{ fontSize: "16px", marginBottom: "20px", height: "40px"}}
      >
        <FileExcelOutlined style={{fontSize: "18px"}}/> Xuất Excel
      </Button>
      {rowSelectedKeys.length > 0 && (
        <div
          style={{
            fontSize: "16px",
            cursor: "pointer",
            fontWeight: "bold",
            padding: "15px",
            color: "red",
            width: "fit-content",
          }}
          onClick={() => {setIsModalOpenDeleteMany(true)}}
        >
          Xóa tất cả
        </div>
      )}
      <div>
        <ConfigProvider
          theme={{
            components: {
              Table: {
                /* here is your component tokens */
                cellFontSize: "16px",
              },
            },
          }}
        >
          <Table
            rowSelection={{
              type: selectionType,
              ...rowSelection,
            }}
            columns={columns}
            dataSource={dataSource}
            {...props}
          />
        </ConfigProvider>
      </div>
      <ModalComponent
        title="Xóa nhiều dữ liệu"
        open={isModalOpenDeleteMany}
        onOk={handleDeleteAll}
        onCancel={() => {setIsModalOpenDeleteMany(false)}}
        cancelText="Hủy bỏ"
      >
        <p>Bạn có chắc muốn xóa các mục đã chọn?</p>
      </ModalComponent>
    </Loading>
  );
};

export default TableComponent;
