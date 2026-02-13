import UniversalCard from './../UniversalCard/UniversalCard';

export default function HighlightsCard() {
  const highlights = [
    { name: 'Online Store', val: '$172k', trend: '+3.9%', up: true },
    { name: 'Facebook', val: '$85k', trend: '-0.7%', up: false },
    { name: 'Instagram', val: '$36k', trend: '+8.2%', up: true },
  ];

  return (
    <UniversalCard
      title="Highlights"
      actionType="dropdown"
      actionOptions={[
        { label: 'Activity', value: '1', icon: '☁️' },
        { label: 'Share', value: '2', icon: '🔗' },
        { label: 'Settings', value: '3', icon: '⚙️' }
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <span style={{ color: 'var(--md-sys-color-on-surface-variant)', fontSize: '14px' }}>All time sales</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '600', color: 'var(--md-sys-color-on-surface)', margin: 0 }}>$295.7k</h2>
            <span style={{ backgroundColor: '#d1fae5', color: '#10b981', fontSize: '12px', padding: '2px 8px', borderRadius: '4px' }}>+2.7%</span>
          </div>
        </div>

        <div style={{ display: 'flex', height: '8px', width: '100%', borderRadius: '4px', overflow: 'hidden', gap: '4px' }}>
          <div style={{ backgroundColor: '#10b981', width: '40%' }} />
          <div style={{ backgroundColor: '#ef4444', width: '20%' }} />
          <div style={{ backgroundColor: '#8b5cf6', width: '15%' }} />
        </div>

        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {highlights.map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px' }}>
              <span style={{ color: 'var(--md-sys-color-on-surface-variant)', fontWeight: '500' }}>{item.name}</span>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <span style={{ fontWeight: '600', color: 'var(--md-sys-color-on-surface)' }}>{item.val}</span>
                <span style={{ color: item.up ? '#10b981' : '#ef4444', fontWeight: '500' }}>
                  {item.up ? '↑' : '↓'} {item.trend}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </UniversalCard>
  );
}
