package trabalho.dev.web.model.domain;

import jakarta.persistence.*;

import java.util.List;

@Entity(name = "Titulo")
public class TituloDomain {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, length = 40)
    private String nome;

    //@Column(nullable = false)
    //private List<AtorDomain> atores;

    //@Column(nullable = false)
    //private DiretorDomain diretor;

    @Column(nullable = false)
    private int ano;

    @Column(nullable = false, length = 150)
    private String sinopse;

    @Column(nullable = false, length = 40)
    private String categoria;

    //@Column(nullable = false)
    //private ClasseDomain classe;

}
