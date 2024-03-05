import React from "react";
import { Space, Table, Tag } from "antd";

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

const MinerTable: React.FC = () => (
    <Table dataSource={data} scroll={{ x: 1600 }}>
        <Column title="tRank" dataIndex="tRank" key="tRank" />
        <ColumnGroup title="Miner Details">
            <Column title="Length" dataIndex="length" key="length" />
            <Column title="Start Day" dataIndex="startDay" key="startDay" />
            <Column title="End Day" dataIndex="endDay" key="endDay" />
            <Column title="Power" dataIndex="power" key="power" />
        </ColumnGroup>
        <Column title="Est. TITANX" dataIndex="estToken" key="estToken" />
        <Column title="~ tRank Bonus" dataIndex="tRankBonus" key="tRankBonus" />
        <ColumnGroup title="Miner ROI">
            <Column title="Cost" dataIndex="cost" key="cost" />
            <Column title="$ Value" dataIndex="value" key="value" />
            <Column title="% ROI" dataIndex="roi" key="roi" />
        </ColumnGroup>
        <Column title="Progress" dataIndex="progress" key="progress" />
        <Column title="Share" dataIndex="share" key="share" />
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

export default MinerTable;
