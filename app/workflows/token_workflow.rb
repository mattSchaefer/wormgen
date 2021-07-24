class TokenWorkflow
    include ActiveModel::Model

    attr_accessor :user
    include Token   
    def initialize()
    end
end