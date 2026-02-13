import { Ticket } from "@/utils/types/card.types";

export const filterTickets = (tickets: Ticket[], search: string) => {
  if (!search) return tickets;
  return tickets.filter(
    (ticket) =>
      ticket.title.toLowerCase().includes(search.toLowerCase()) ||
      ticket.team.toLowerCase().includes(search.toLowerCase()) ||
      ticket.assignee.toLowerCase().includes(search.toLowerCase())
  );
};

export const paginateTickets = (
  tickets: Ticket[],
  currentPage: number,
  rowsPerPage: number
) => {
  return tickets.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
};

export const toggleTicketSelect = (
  tickets: Ticket[],
  id: string
): Ticket[] => {
  return tickets.map((ticket) =>
    ticket.id === id ? { ...ticket, isSelected: !ticket.isSelected } : ticket
  );
};

export const toggleSelectAll = (
  tickets: Ticket[],
  allSelected: boolean
): Ticket[] => {
  return tickets.map((t) => ({ ...t, isSelected: !allSelected }));
};

export const deleteSelectedTickets = (tickets: Ticket[]): Ticket[] => {
  return tickets.filter((t) => !t.isSelected);
};
