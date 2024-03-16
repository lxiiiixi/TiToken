import { Table, Progress, Button } from "antd";
import { UserStakeInfo } from "@/configs/interfaces";
import { formatPrice, timestampToDate } from "@/configs/utils";
import { formatEther } from "viem";
import { useTokenPrice } from "@/hooks/useTokenPrice";
import { useEndStake } from "@/hooks/useWriteTokenContract";
import useContractHashNotification from "@/hooks/useContractHashNotification";

const { Column, ColumnGroup } = Table;

export interface StakeTableDataType {
    key: bigint;
    stakeID: bigint;
    length: number;
    startDay: number;
    endDay: number;
    tokenStaked: bigint;
    shareRate: bigint;
    shares: bigint;
    value: bigint;
    progress: number;
    isClaimable: boolean;
    actionId: bigint;
    stakeInfo: UserStakeInfo;
}

const StakeTable = ({
    type,
    data,
}: {
    type: "active" | "claimable" | "ended";
    data: StakeTableDataType[];
}) => {
    const tokenPrice = useTokenPrice();
    const { endStake, endStakeHash, endStakePending } = useEndStake();
    useContractHashNotification(endStakePending, endStakeHash);

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
                    let shareRate = 0n;
                    let shares = 0n;
                    let value = 0n;

                    data.forEach(
                        ({
                            tokenStaked,
                            shareRate: _shareRate,
                            shares: _shares,
                            value: _value,
                        }) => {
                            estTokenAmount += tokenStaked;
                            shareRate += _shareRate;
                            shares += _shares;
                            value += _value;
                        }
                    );
                    return (
                        <>
                            <Table.Summary.Row>
                                <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
                                <Table.Summary.Cell index={0}></Table.Summary.Cell>
                                <Table.Summary.Cell index={0}></Table.Summary.Cell>
                                <Table.Summary.Cell index={0}></Table.Summary.Cell>
                                <Table.Summary.Cell index={1}>
                                    {formatPrice(formatEther(estTokenAmount))}
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={10}>
                                    {formatPrice(Number(shareRate))}
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={3}>
                                    {formatPrice(formatEther(shares))}{" "}
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={4}>
                                    {formatPrice(formatEther(value * (tokenPrice || 0n)))}{" "}
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={0}></Table.Summary.Cell>
                                {type !== "ended" && (
                                    <Table.Summary.Cell index={0}></Table.Summary.Cell>
                                )}
                            </Table.Summary.Row>
                        </>
                    );
                }}
            >
                <Column
                    title="stakeID"
                    dataIndex="stakeID"
                    key="stakeID"
                    render={(stakeID: bigint) => stakeID.toString()}
                />
                <ColumnGroup title="Stake Details">
                    <Column title="Length" dataIndex="length" key="length" />
                    <Column
                        title="Start Day"
                        dataIndex="startDay"
                        key="startDay"
                        render={(value: number) => timestampToDate(BigInt(value))}
                    />
                    <Column
                        title="End Day"
                        dataIndex="endDay"
                        key="endDay"
                        render={(value: number) => timestampToDate(BigInt(value))}
                    />
                </ColumnGroup>
                <Column
                    title="TITANX Staked"
                    dataIndex="tokenStaked"
                    key="tokenStaked"
                    render={(value: bigint) => formatPrice(formatEther(value))}
                />
                <ColumnGroup title="Stake Shares">
                    <Column
                        title="Eff. Share Rate"
                        dataIndex="shareRate"
                        key="shareRate"
                        render={(value: bigint) => formatPrice(Number(value))}
                    />
                    <Column
                        title="Shares"
                        dataIndex="shares"
                        key="shares"
                        render={(value: bigint) => formatPrice(formatEther(value))}
                    />
                    <Column
                        title="Value"
                        dataIndex="value"
                        key="value"
                        render={(value: bigint) =>
                            formatPrice(formatEther(value * (tokenPrice || 0n)))
                        }
                    />
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
                {type !== "ended" && (
                    <Column
                        title="Action"
                        dataIndex="action"
                        key="action"
                        render={(mid: string) => (
                            <Button
                                type="primary"
                                size="small"
                                onClick={() => endStake && endStake(Number(mid))}
                            >
                                End Stake
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

export default StakeTable;
