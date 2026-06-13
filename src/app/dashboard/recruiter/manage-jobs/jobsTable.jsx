"use client"
import { Table, Chip, Button } from "@heroui/react";
import {
  HiOutlinePencilAlt,
  HiOutlineEye,
  HiOutlineTrash,
} from "react-icons/hi";

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "success";
      case "inactive":
        return "danger";
      default:
        return "warning";
    }
  };

    // API এর status ভ্যালুর সাথে Chip এর কালার ম্যাপিং
  // const stateColorMap = {
  //   active: "success",
  //   inactive: "warning",
  // };
  
export default function JobsTable({jobs}) {
  return (
    <section>
       <Table className="bg-[#18181B] rounded-xl shadow-xl overflow-hidden">
                <Table.ScrollContainer>
                  <Table.Content
                    aria-label="Job Applications Table"
                    className="min-w-[800px]"
                  >
                    <Table.Header>
                      <Table.Column
                        isRowHeader
                        className="bg-[#18181B] text-gray-400 font-semibold py-4"
                      >
                        Job Title
                      </Table.Column>
                      <Table.Column className="bg-[#18181B] text-gray-400 font-semibold py-4">
                        Type / Category
                      </Table.Column>
                      <Table.Column className="bg-[#18181B] text-gray-400 font-semibold py-4">
                        Location
                      </Table.Column>
                      <Table.Column className="bg-[#18181B] text-gray-400 font-semibold py-4">
                        State
                      </Table.Column>
                      <Table.Column className="bg-[#18181B] text-gray-400 font-semibold py-4 text-right">
                        Action
                      </Table.Column>
                    </Table.Header>
      
                    <Table.Body>
                      {jobs.map((job, index) => (
                        <Table.Row
                          key={index}
                          className="border-b border-gray-800/60 hover:bg-[#1C1C1F] transition-colors"
                        >
                          {/* Job Title (API: jobTitle) */}
                          <Table.Cell className="py-4">
                            <span className="text-white font-medium text-[15px]">
                              {job.jobTitle}
                            </span>
                          </Table.Cell>
      
                          {/* Type / Category (API: jobType / jobCategory) */}
                          <Table.Cell className="py-4">
                            <div className="flex flex-col gap-0.5">
                              <span className="text-gray-300 text-[14px]">
                                {job.jobType}
                              </span>
                              <span className="text-xs text-gray-500 font-light">
                                {job.jobCategory}
                              </span>
                            </div>
                          </Table.Cell>
      
                          {/* Location (API: jobLocation) */}
                          <Table.Cell className="py-4">
                            <span className="text-gray-400 text-[14px]">
                              {job.jobLocation}
                            </span>
                          </Table.Cell>
      
                          {/* State/Status (API: status) */}
                          <Table.Cell className="py-4">
                            <Chip
                              color={getStatusColor(job.status)}
                              size="sm"
                              variant="flat"
                              className="px-3 capitalize font-medium h-6 text-xs"
                            >
                              {job.status}
                            </Chip>
                          </Table.Cell>
      
                          {/* Action Column */}
                          <Table.Cell className="py-4 text-right">
                            <div className="flex gap-1 items-center justify-end">
                              <Button
                                isIconOnly
                                variant="light"
                                size="sm"
                                className="hover:bg-gray-800 min-w-8 w-8 h-8 rounded-lg"
                                aria-label="View Item"
                              >
                                <HiOutlineEye size={18} className="text-gray-400" />
                              </Button>
                              <Button
                                isIconOnly
                                variant="light"
                                size="sm"
                                className="hover:bg-gray-800 min-w-8 w-8 h-8 rounded-lg"
                                aria-label="Edit Item"
                              >
                                <HiOutlinePencilAlt
                                  size={18}
                                  className="text-gray-400"
                                />
                              </Button>
                              <Button
                                isIconOnly
                                variant="light"
                                size="sm"
                                className="hover:bg-gray-800/50 min-w-8 w-8 h-8 rounded-lg"
                                aria-label="Delete Item"
                              >
                                <HiOutlineTrash
                                  size={18}
                                  className="text-red-500/80 hover:text-red-500"
                                />
                              </Button>
                            </div>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table.Content>
                </Table.ScrollContainer>
              </Table>
    </section>
  );
}