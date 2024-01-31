import requests
from bs4 import BeautifulSoup

from Entity import MovieInformation
from constant import CONSTANT


def get_per_page_infos(url):
    html_content = requests.get(url).text

    soup = BeautifulSoup(html_content, 'lxml')
    video_cards_list = soup.find_all(name='div', attrs={'class': 'el-card__body'})
    result = []
    for video_card in video_cards_list:
        # 电影详情链接
        detail_href = video_card.a.attrs['href']
        # 电影名称
        video_name = video_card.h2.string
        # 电影分类标签
        category_tags = video_card.find(name='div', attrs={'class': 'categories'}).find_all(name='span')
        categories = []
        for category_tag in category_tags:
            categories.append(category_tag.string)
        # 电影上映地点、时长、上映时间
        tmp_list = video_card.find_all(name='div', class_=['m-v-sm', 'info'])
        spans = []
        for tmp in tmp_list:
            spans.extend(tmp.find_all(name='span'))
        area, duration, date = spans[0].string, int(spans[2].string.replace('分钟', '').strip()), spans[
            3].string if len(
            spans) == 4 else 'unknown'
        # 电影评分
        score = video_card.find(name='p', class_='score').string
        # 电影简介
        detail_content = requests.get(url + detail_href).text
        detail_soup = BeautifulSoup(detail_content, 'lxml')
        synopsis = detail_soup.find(name='p').string.strip()

        this_video = MovieInformation(video_name, categories, area, duration, date, synopsis, score)
        result.append(this_video)

        print("《%s》信息已获取完毕！！" % video_name)
    return result
