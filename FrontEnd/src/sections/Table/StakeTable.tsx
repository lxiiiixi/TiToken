import React from "react";
import { Table } from "antd";

const { Column, ColumnGroup } = Table;

interface DataType {
    key: React.Key;
    firstName: string;
    lastName: string;
    age: number;
    address: string;
    tags: string[];
}

const data: DataType[] = [
    {
        key: "1",
        firstName: "John",
        lastName: "Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        tags: ["nice", "developer"],
    },
    {
        key: "2",
        firstName: "Jim",
        lastName: "Green",
        age: 42,
        address: "London No. 1 Lake Park",
        tags: ["loser"],
    },
    {
        key: "3",
        firstName: "Joe",
        lastName: "Black",
        age: 32,
        address: "Sydney No. 1 Lake Park",
        tags: ["cool", "teacher"],
    },
];

const StakeTable: React.FC = () => (
    <Table dataSource={data} scroll={{ x: 1600 }} footer={() => <></>}>
        <Column title="stakeID" dataIndex="stakeID" key="stakeID" />
        <ColumnGroup title="Stake Details">
            <Column title="Length" dataIndex="length" key="length" />
            <Column title="Start Day" dataIndex="startDay" key="startDay" />
            <Column title="End Day" dataIndex="endDay" key="endDay" />
        </ColumnGroup>
        <Column title="TITANX Staked" dataIndex="tokenStaked" key="tokenStaked" />
        <ColumnGroup title="Stake Shares">
            <Column title="Eff. Share Rate" dataIndex="shareRate" key="shareRate" />
            <Column title="Shares" dataIndex="shares" key="shares" />
            <Column title="Value" dataIndex="value" key="value" />
        </ColumnGroup>
        <Column title="Progress" dataIndex="progress" key="progress" />
        <Column title="Action" dataIndex="action" key="action" />

        {/* <Column
            title="Tags"
            title="Tags"
            dataIndex="tags"
            key="tags"
            render={(tags: string[]) => (
                <>
                    {tags.map(tag => (
                        <Tag color="blue" key={tag}>
                            {tag}
                        </Tag>
                    ))}
                </>
            )}
        /> */}
    </Table>
);

export default StakeTable;
