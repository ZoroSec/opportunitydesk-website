const roles = {
  brokers: { form: 'Business broker', subtitle: 'For your next owner conversation', title: 'Get closer to the owners behind the businesses.', description: 'Build a search for owner-led businesses in your market. Start with the industries and locations you serve, then explore relevant ownership-transition opportunities.', cta: 'Build a broker sourcing brief', example: 'Find independent business owners in my region for an initial conversation about ownership transition.', criteria: ['Owner-led businesses', 'Selected industries', 'Regional search'] },
  'real-estate': { form: 'Real estate professional', subtitle: 'For business and property opportunities', title: 'Meet the owners behind the places.', description: 'Explore businesses and owners relevant to your market. Shape the search around your geography and the business context that matters to your work.', cta: 'Build a real estate sourcing brief', example: 'Identify business owners in my target area whose business and property context could lead to a relevant conversation.', criteria: ['Business owners', 'Target area', 'Property context'] },
  acquisition: { form: 'Acquisition team', subtitle: 'For your next acquisition search', title: 'Give your acquisition search a clear direction.', description: 'Define your ideal business, target industries, and locations. Explore relevant owners with a search grounded in your criteria.', cta: 'Build an acquisition sourcing brief', example: 'Find owner-led businesses in selected industries and locations to explore a possible acquisition conversation.', criteria: ['Target industries', 'Ownership context', 'Defined geography'] }
};

const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#navigation');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    navigation.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
  }
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    navigation.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.focus();
  }
});

const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
function selectRole(tab) {
  const content = roles[tab.dataset.role];
  tabs.forEach((item) => {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
  });
  document.querySelector('#role-panel').setAttribute('aria-labelledby', tab.id);
  document.querySelector('#role-subtitle').textContent = content.subtitle;
  document.querySelector('#role-title').textContent = content.title;
  document.querySelector('#role-description').textContent = content.description;
  document.querySelector('#role-cta').firstChild.textContent = content.cta;
  document.querySelector('#example-objective').textContent = content.example;
  document.querySelector('#example-criteria').replaceChildren(...content.criteria.map((text) => {
    const chip = document.createElement('span');
    chip.textContent = text;
    return chip;
  }));
  document.querySelector('#form-role').value = content.form;
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectRole(tab));
  tab.addEventListener('keydown', (event) => {
    const moves = { ArrowRight: (index + 1) % tabs.length, ArrowLeft: (index + tabs.length - 1) % tabs.length, Home: 0, End: tabs.length - 1 };
    if (Object.hasOwn(moves, event.key)) {
      event.preventDefault();
      const next = tabs[moves[event.key]];
      selectRole(next);
      next.focus();
    }
  });
});

document.querySelector('#year').textContent = String(new Date().getFullYear());
document.querySelector('#brief-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  form.querySelectorAll('input, textarea').forEach((field) => { field.value = field.value.trim(); });
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const brief = [
    'OpportunityDesk — Sourcing brief',
    'Prepared: ' + new Date().toLocaleDateString('en-GB'),
    '',
    'Name: ' + data.get('name').trim(),
    'Email: ' + data.get('email').trim(),
    'Role: ' + data.get('role'),
    'Target location: ' + data.get('location').trim(),
    'Target industries: ' + (data.get('industry').trim() || 'To be discussed'),
    '',
    'Objective and ideal fit:',
    data.get('objective').trim(),
    '',
    'Next step: review and share this brief with your sourcing team.',
    'This brief was prepared on your device. It has not been submitted and outreach has not started.'
  ].join('\n');
  const blob = new Blob([brief], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'opportunitydesk-sourcing-brief.txt';
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
  const status = document.querySelector('#form-status');
  status.hidden = false;
  status.textContent = 'Your brief is ready. Check your downloads, then review and share it with your sourcing team. No enquiry was sent.';
});
