class Config(object):
    class ConstError(TypeError):
        pass

    class ConstCaseError(ConstError):
        pass

    def __setattr__(self, name, value):
        if name in self.__dict__.keys():
            # 设置禁止常量修改
            raise self.ConstCaseError("Can't change a const variable:'%s'" % name)
        if not name.isupper():
            # 设置常量均需要大写
            raise self.ConstCaseError("Const variable must be combined with upper letters:'%s'" % name)
        self.__dict__[name] = value


CONSTANT = Config()
CONSTANT.SPIDER_SSR_URL_1 = "https://ssr1.scrape.center"
CONSTANT.SPIDER_SSR_URL_2 = "https://ssr2.scrape.center"
CONSTANT.SPIDER_SSR_URL_3 = "https://ssr3.scrape.center"
CONSTANT.SPIDER_SSR_URL_4 = "https://ssr4.scrape.center"
