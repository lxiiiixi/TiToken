import React from "react";
import { Table, Progress, Button } from "antd";
const { Column, ColumnGroup } = Table;
import { UserMintInfo } from "@/configs/interfaces";
import { formatPercentage, formatPrice } from "@/configs/utils";
import { formatEther } from "viem";
import { useTokenPrice, useETHPrice } from "@/hooks/useTokenPrice";
import { useClaimMint } from "@/hooks/useWriteTokenContract";

export interface MinerTableDataType {
    mid: string;
    key: React.Key;
    tRank: string;
    length: string;
    startDay: string;
    endDay: string;
    power: string;
    estToken: string;
    tRankBonus: string;
    cost: string;
    value: string;
    roi: string;
    progress: number;
    isClaimable: boolean;
    mintInfo: UserMintInfo;
    // share: string;
    // action: string;
}

const MinerTable = ({
    type,
    data,
}: {
    type: "active" | "claimable" | "ended";
    data: MinerTableDataType[];
}) => {
    const tokenPrice = useTokenPrice();
    const ethPrice = useETHPrice();
    const { claimMint } = useClaimMint();
    return (
        <div className="rounded-lg overflow-hidden text-xs">
            <Table
                dataSource={data}
                scroll={{ x: 1200 }}
                bordered
                pagination={false}
                className="antd-costom"
                summary={data => {
                    let estTokenAmount = 0n;
                    let tRankBonus = 0;
                    let cost = 0n;

                    data.forEach(({ mintInfo }) => {
                        estTokenAmount += mintInfo.mintableTitan;
                        tRankBonus += mintInfo.mintPowerBonus;
                        cost += mintInfo.mintCost;
                        // value += _value;
                        // roi += _roi;
                    });

                    const rewardTokenValue = tokenPrice
                        ? formatEther((estTokenAmount * tokenPrice) / BigInt(1e18))
                        : 0n;
                    const costEthValue = ethPrice * Number(formatEther(cost));
                    const roi = (Number(rewardTokenValue) - costEthValue) / costEthValue;

                    return (
                        <>
                            <Table.Summary.Row>
                                <Table.Summary.Cell index={0}>
                                    Total({data.length})
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={0}></Table.Summary.Cell>
                                <Table.Summary.Cell index={0}></Table.Summary.Cell>
                                <Table.Summary.Cell index={0}></Table.Summary.Cell>
                                <Table.Summary.Cell index={0}></Table.Summary.Cell>
                                <Table.Summary.Cell index={1}>
                                    {formatPrice(formatEther(estTokenAmount))}
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={1}>
                                    {formatPrice(tRankBonus)}
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={3}>
                                    {formatPrice(formatEther(cost), 4)}
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={4}>
                                    {formatPrice(rewardTokenValue)}
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={4}>
                                    {formatPercentage(roi, false)}
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={0}></Table.Summary.Cell>
                                {type === "claimable" && (
                                    <Table.Summary.Cell index={0}></Table.Summary.Cell>
                                )}
                            </Table.Summary.Row>
                        </>
                    );
                }}
            >
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
                <Column
                    title="Progress"
                    dataIndex="progress"
                    key="progress"
                    render={(progress: number) => (
                        <Progress
                            percent={progress}
                            className="w-[100px] text-[10px] m-0 mr-2"
                            status="active"
                        />
                    )}
                />
                {/* <Column
                title="Share"
                dataIndex="share"
                key="share"
                render={(shareId: string) => <Button type="primary">{shareId}</Button>}
            /> */}

                {type === "claimable" && (
                    <Column
                        title="Action"
                        dataIndex="mid"
                        key="mid"
                        render={(mid: string) => (
                            <Button
                                type="primary"
                                onClick={() => claimMint && claimMint(Number(mid))}
                            >
                                {mid}
                            </Button>
                        )}
                    />
                )}

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
        </div>
    );
};

export default MinerTable;
