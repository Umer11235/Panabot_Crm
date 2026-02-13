'use client';
import TicketList from "@/components/(Cards)/TicketTable/TicketTable";
export default function TicketsPage() {
    return (
        <div>
            <h1 style={{
                font: 'var(--md-sys-typescale-headline-medium)',
                color: 'var(--md-sys-color-on-surface)',
                marginBottom: '24px'
            }}>Tickets</h1>
            <TicketList />
        </div>
    );
}