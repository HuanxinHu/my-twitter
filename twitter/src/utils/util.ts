export function getCookie(cname: string) {
  var name = cname + '=';
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

export function setCookie(cname: string, cvalue: string | boolean | number, exdays: number) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

export function tweetTimeParse(createdAt: string) {
  const currentTime = new Date().getTime();
  const createdTime = new Date(createdAt).getTime();
  const delta = currentTime - createdTime;
  if (delta < 3600 * 1000 * 24) {
    return formatDurationSeconds(delta / 1000);
  }
  const currentYear = new Date().getFullYear().toString();
  let [month, day, year] = new Date(createdAt).toLocaleDateString().split('/');
  year = year === currentYear ? '' : year;

  return [month, day, year].filter((item) => item).join('/');
}

export function formatDurationSeconds(secNum: number) {
  const hours = Math.floor(secNum / 3600);
  const minutes = Math.floor((secNum - hours * 3600) / 60);
  const seconds = Math.ceil(secNum - hours * 3600 - minutes * 60);

  if (hours) return hours + 'h';
  if (minutes) return minutes + 'm';
  if (seconds) return seconds + 's';
}

export function splitPathname(pathname: string = window.location.pathname) {
  const paths = pathname.split('/').filter((item) => item);
  const isMyProfilePath = paths.length === 1 && paths[0] === 'profile';
  const isUserProfilePath = paths[0] === 'profile' && paths[1];
  return {
    paths,
    isMyProfilePath,
    isUserProfilePath,
  };
}
